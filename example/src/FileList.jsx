import * as React from 'react';

class FileList extends React.Component {
  render() {
    const { files } = this.props;
    if (files.length === 0) {
      return null;
    }

    return <div>{this.list(files)}</div>;
  }

  list(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      const { result } = reader;
      const base64 = result ? result.toString().split(',')[1] : '';
      console.debug(base64);
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };
    return files.map(file => <li key={file.name}>{file.name}</li>);
  }
}

export default FileList;
