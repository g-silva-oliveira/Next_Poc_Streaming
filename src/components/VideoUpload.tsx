import React, { useState } from 'react'
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios'

export default function VideoUpload() {
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit() {
    const data = new FormData();

    if (!file) return;

    setSubmitting(true);

    data.append('file', file);

    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent: AxiosProgressEvent) {
        const total = progressEvent.total as number;
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / total
        );
        setProgress(percentComplete);
      }
    };

    try {
      await axios.post("/api/videos", data, config);
    } catch (err: unknown | any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setProgress(0);
    };
  };

  function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files?.length) {
      setFile(files[0]);
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {submitting && <p>{progress} %</p>}
      <form action="POST">
        <div>
          <label htmlFor="file">File</label>
          <input type="file" id="file" accept='video/*' onChange={handleSetFile} />
        </div>
      </form>
      <button onClick={handleSubmit}>
        _Upload Video_
      </button>
    </div>
  )
}
