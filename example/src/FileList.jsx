import * as React from 'react';

const styles = {
  width: 200,
  height: 200,
  border: '1px solid'
};

class FileList extends React.Component {
  render() {
    const { files } = this.props;
    if (files.length === 0) {
      return <div style={styles}>null</div>;
    }

    return <div styles={styles}>{this.list(files)}</div>;
  }

  list = files => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      const { result } = reader;
      const base64 = result ? result.toString().split(',')[1] : '';
      console.log(base64);
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };
    return files.map(file => <li key={file.name}>name: {file.name}</li>);
  };
}

export default FileList;
