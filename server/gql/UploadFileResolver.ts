import { join, resolve } from 'path';
import { createWriteStream, unlinkSync } from 'fs';
import { Readable, ReadableOptions } from 'stream';
import { IResolver } from '../src/types';
import { config } from 'dotenv';
import { SERVER_ROOT } from '../src/app.js';
config();

const writeFileToDisk = (file: File) => {
	const { createReadStream, filename } = file;

	const stream = createReadStream();

	// TODO : Make this a global
	const directory = 'public/uploads';

	const path = join(SERVER_ROOT, directory);
	const filePath = join(path, filename);
	const urlPath = join(directory, filename);

	return new Promise<UploadFileResult>((res, rej) => {
		stream
			.on('error', error => {
				unlinkSync(path);
				stream.destroy();
				rej({
					success: false,
					message: `File "${filename}" could not be saved. \n Error: ${error}`,
				});
			})
			.pipe(createWriteStream(filePath))
			.on('finish', () => {
				res({
					url: `http://localhost:5050/${urlPath}`,
					success: true,
					message: `File "${filename}" was saved successfully.`,
				});
			});
	});
};

export const UploadFileResolver: IResolver<FileUpload, UploadFileResult> = async (
	_,
	args
) => {
	return await writeFileToDisk(await args.file);
};

export const UploadFilesResolver: IResolver<FilesUpload, UploadFileResult[]> = async (
	_,
	{ files }
) => {
	const allFiles = await Promise.allSettled(files);

	const fileBuffer = [];
	const result: UploadFileResult[] = [];

	for (const file of allFiles) {
		if (file.status === 'fulfilled') fileBuffer.push(writeFileToDisk(file.value));
		else result.push({ success: false, message: `Couldn\'t upload the file.` });
	}

	const writtenFiles = await Promise.allSettled(fileBuffer);

	for (const writtenFile of writtenFiles) {
		if (writtenFile.status === 'fulfilled') result.push(writtenFile.value);
		else result.push(writtenFile.reason);
	}

	return result;
};

interface File {
	filename: string;
	mimetype: string;
	encoding: string;
	createReadStream: (options?: ReadableOptions) => Readable;
}

interface FileUpload {
	file: Promise<File>;
}

interface FilesUpload {
	files: Array<Promise<File>>;
}

interface UploadFileResult {
	url?: string;
	success: boolean;
	message: string;
}
