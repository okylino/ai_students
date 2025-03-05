import axios from 'axios';

/** upload file to s3 presignedUrl (https) */
export const putFileToPresignedUrl = async (putUrl: string, file: Blob) => axios.put(putUrl, file);
