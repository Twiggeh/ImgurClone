import { join, resolve } from 'path';
import { createWriteStream, unlinkSync } from 'fs';
import { Readable, ReadableOptions } from 'stream';
import { IResolver } from '../src/types';
import { config } from 'dotenv';
import { SERVER_ROOT, SERVER_URL } from '../src/app.js';
import { MutationResolvers, UploadFileResult } from 'generated/gql';
config();

const writeFileToDisk = async (file: File) => {
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
				unlinkSync(filePath);
				stream.destroy();
				res({
					__typename: 'UploadFileFailure',
					message: `File "${filename}" could not be saved. \n Error: ${error}`,
				});
			})
			.pipe(createWriteStream(filePath))
			.on('finish', () => {
				res({
					__typename: 'UploadFileSuccess',
					url: `http://${SERVER_URL}/${urlPath}`,
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

export const UploadFilesResolver: MutationResolvers['uploadFiles'] = async (_, args) => {
	const allFiles = await Promise.allSettled(args.files);

	const fileBuffer = [];
	const result: UploadFileResult[] = [];

	for (const file of allFiles) {
		if (file.status === 'fulfilled') fileBuffer.push(writeFileToDisk(file.value));
		else result.push({ message: `Couldn\'t upload the file.` });
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
