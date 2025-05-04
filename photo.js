AWS.config.update({
    accessKeyId: 'AKIARHQBNKIKQQCWOOAE',
    secretAccessKey: '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',
    region: 'us-east-2'
  });
  
  const s3 = new AWS.S3();
  document.getElementById('upload-btn').addEventListener('click', () => {
    const file = document.getElementById('file-upload').files[0];
    if (file) {
      s3.upload({
        Bucket: 'au-web-project-photoupload',
        Key: `uploads/${file.name}`,
        Body: file,
        ACL: 'public-read'
      }, (err, data) => err ? console.error(err) : console.log(data));
    }
  });