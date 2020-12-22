import React, { useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

export type PassedFile = {
	uuid: string;
	url: string;
	dataFile: File;
	uploaded?: boolean;
};

const DragAndDrop: React.FC<{
	max: number;
	passedFiles: PassedFile[] | undefined;
	setPassedFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>;
	setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
	formats?: string[];
}> = ({ children, max, passedFiles, setPassedFiles, setErrorMessage, formats }) => {
	const dragRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleDragOver: (this: HTMLDivElement, ev: DragEvent) => void = e => {
			e.preventDefault();
			// e.stopPropagation();
		};

		const handleDrop: (this: HTMLDivElement, ev: DragEvent) => void = e => {
			e.preventDefault();
			//e.stopPropagation();
			const dataTrans = e.dataTransfer;
			if (!dataTrans?.files) return;

			const dataFileBuffer: PassedFile[] = [];

			// Add all files to the buffer
			for (const dataFile of dataTrans.files) {
				// Wrong type
				if (!dataFile.type.startsWith('image/') && setErrorMessage) {
					setErrorMessage(`Type ${dataFile.type} is not supported.`);
					continue;
				}
				// Over max upload
				const toBeUploaded = passedFiles?.length
					? passedFiles.length + dataFileBuffer.length
					: dataFileBuffer.length;
				if (max <= toBeUploaded && setErrorMessage) {
					setErrorMessage(
						`Only ${max} file${toBeUploaded !== 1 ? 's' : ''} can be uploaded at a time.`
					);
					break;
				}
				dataFileBuffer.push({
					uuid: uuid(),
					dataFile,
					uploaded: undefined,
					url: URL.createObjectURL(dataFile),
				});
			}

			// update React with the blobs
			setPassedFiles(c => (c ? [...c, ...dataFileBuffer] : [...dataFileBuffer]));
		};

		if (dragRef?.current === null) return;
		dragRef.current.addEventListener('dragover', handleDragOver);
		dragRef.current.addEventListener('drop', handleDrop);
		const eventObject = dragRef.current;

		return () => {
			eventObject.removeEventListener('dragover', handleDragOver);
			eventObject.removeEventListener('drop', handleDrop);
		};
	}, [max, passedFiles, setPassedFiles, setErrorMessage]);

	return (
		<div style={{ width: '100%', height: '100%' }} ref={dragRef}>
			{children}
		</div>
	);
};

DragAndDrop.displayName = 'DragAndDrop';
export default DragAndDrop;
