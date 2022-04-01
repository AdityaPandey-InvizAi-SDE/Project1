import React from 'react';
// import './record.css';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isRecording1: false,
      blobURL: '',
      isBlocked: false,
      url: '',
      dataList:[
        { id: 1, name: "Peter" ,isRecording:false,blobURL:""},
        { id: 2, name: "Thomas",isRecording:false,blobURL:"" },
        { id: 3, name: "Kallu",isRecording:false,blobURL:"" },
      ],
      apiData: [{}],
      apiData1: {}
      
    };
  }

  start = (user) => {

console.log(user)
let d1 ={id: user.id, name: user.name ,isRecording:true,blobURL:""}
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          
          this.setState((prevState) => ({
           dataList: prevState.dataList.map((item) =>
             item.id === d1.id ? { ...d1 } : item
           )
         }));
        }).catch((e) => console.error(e));
    }
  };
  stop = (user) => {
    
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'me-at-thevoice.mp3', {
            type: blob.type,
            lastModified: Date.now()
          });
          
          const player = new Audio(URL.createObjectURL(file));

          console.log("play",player)
        //   player.play();x`

        const blobURL = URL.createObjectURL(blob)
        console.log("hell", blobURL)
        var wavfromblob = new File([blob], "incomingaudioclip.mp3",{type:"audio/mpeg"});
        console.log(wavfromblob);
        const formData= new FormData();
        formData.append("file",wavfromblob);
        console.log(formData)
        fetch('http://localhost:8080/api/words/upload/1002', {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('Users'),
        },
          body: formData
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
          .then((responseJson) => {
            console.log("file Upload",responseJson)
          })
          .catch((error) => {
            console.log(error)
          });
        this.setState({ blobURL: blobURL});
        let d1 ={id: user.id, name: user.name,isRecording:false,blobURL:blobURL}
        this.setState((prevState) => ({
            dataList: prevState.dataList.map((item) =>
              item.id === d1.id ? { ...d1 } : item
            )
          }));

        // this.sendAudioFile(wavfromblob);
    
      }).catch((e) => console.log(e));
    };

  
  componentDidMount() {
    const getComments = async (currentPage) => {
      const res = await fetch(
          `http://localhost:8080/api/words/list?page=1&limit=10`, {
          headers: {
              'x-access-token': localStorage.getItem('Users'),
          }
      }

      );
      const data = await res.json();
   
      console.log(data)
 
      this.setState({
          apiData: data.data
      })
      // console.log(r)

      const arr = this.state.apiData?.data.map((e)=>{
        return {...e,isRecording:false}
      })
      console.log("hello",arr)
      this.setState({
        apiData1:arr
      })
  };

  getComments();



    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render() {
    console.log(this.state.apiData)
    return (
      <div className="App">
        <header className="App-header">
          {this.state.apiData?.map((user) => (
      <div className="user">{user.id}:    
      {/* <button onClick={()=>{this.start(user)}} disabled={user.isRecording}>Record</button>
      <button onClick={()=>{this.stop(user)}} disabled={!user.isRecording}>Stop</button>
      <audio src={user.blobURL} controls="controls" /> */}
      </div>
    ))}
        </header>
      </div>
    );
  }
}

export default Record;
