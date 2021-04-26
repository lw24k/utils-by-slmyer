//receive dataurl && transform to blob

const transitionToBlob = (dataurl) => {
  const minestr = atob(dataurl.split(",")[1]);
  const minetype = dataurl.split(",")[0].split(":")[1].split(";")[0];

  // create ArrayBuffer
  const ab = new ArrayBuffer(minestr.length);

  // create an array of 8-bit unsigned integers
  const ua = new Uint8Array(ab);

  for (let i = 0; i < minestr.length; i++) {
    ua[i] = minestr.charCodeAt(i);
  }

  return new Blob([ua], { type: minetype });
};

const toBlobUrl = (file) => window.URL.createObjectURL(file);

// or readAsText readAsArrayBuffer ...
const toBaseUrl = (file) => {
  return new Promise((res, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      res(reader.result);
    };
    reader.readAsDataURL(file);

    reader.onerror = (e) => {
      reject(e);
    };
  });
};

// ArrayBuffer 是一个 长度固定的二进制缓冲区 不可读写
// 需通过DataView 以及 TypedArray 进行操作
