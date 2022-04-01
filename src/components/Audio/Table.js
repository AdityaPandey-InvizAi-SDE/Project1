import React from 'react';
import './Table.css';
import MicRecorder from 'mic-recorder-to-mp3';
import ReactPaginate from 'react-paginate'

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
            userToken: '',
            dataList: [
                { id: 1, name: "Peter", isRecording: false, blobURL: "" },
                { id: 2, name: "Thomas", isRecording: false, blobURL: "" },
                { id: 3, name: "Kallu", isRecording: false, blobURL: "" },
            ],
            apiData: [{}],
            apiData1: [{}],


        };
    }

    start = (user) => {

        console.log(user)
        let d1 = { medicine_name: user.medicine_name, mrp: user.mrp, id: user.id, isRecording: true, blobURL: '' }
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {

                    this.setState((prevState) => ({
                        apiData1: prevState.apiData1.map((item) =>
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

                console.log("play", player)
                const blobURL = URL.createObjectURL(blob)
                console.log("hell", blobURL)
                var wavfromblob = new File([blob], "incomingaudioclip.mp3", { type: "audio/mpeg" });
                console.log(wavfromblob);
                const formData = new FormData();
                formData.append("file", wavfromblob);
                console.log(formData)
                fetch(`http://localhost:8080/api/words/upload/${user.id}`, {
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
                        console.log("file Upload", responseJson)
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                this.setState({ blobURL: blobURL });
                let d1 = { medicine_name: user.medicine_name, mrp: user.mrp, id: user.id, isRecording: false, blobURL: blobURL }
                this.setState((prevState) => ({
                    apiData1: prevState.apiData1.map((item) =>
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



            this.setState({
                apiData: data
            })
            // console.log(r)
            const arr = this.state.apiData?.data?.map((e) => {
                return {
                    ...e, isRecording: false,
                    blobURL: ""
                }
            })

            this.setState({
                apiData1: arr
            })

        };

        getComments();
        // Dummy Work
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

        // updating the Object array



    }

    fetchBooks = (currentPage) => {
        fetch(
            `http://localhost:8080/api/words/list?page=${currentPage}&limit=10`, {
            headers: {
                'x-access-token': localStorage.getItem('Users')
            }
        }

        )
            .then((response) => response.json())
            .then(booksList => {

                this.setState({ apiData1: booksList.data })
            });
    }

    handlePageClick = async (data) => {
        // console.log(data.selected);

        let currentPage = data.selected + 1;

        const commentsFormServer = this.fetchBooks(currentPage);


    };


    render() {

        console.log("hee", this.state.apiData1)
        return (
            <>



                <div className='tableBody'>

                    <main>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Medicine Information
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.apiData1?.map((user) => (
                                    <tr>
                                        <td data-title='Provider Name'>
                                            {user.medicine_name}
                                        </td>
                                        <td class='select'>
                                            {!user.isRecording ? <a class='button' onClick={() => { this.start(user) }} disabled={""}>
                                                Record
                                            </a> : ""}
                                            {user.isRecording ?
                                                <a class='button' onClick={() => { this.stop(user) }} disabled={"!user.isRecording"}>Stop</a> : ""}
                                        </td>
                                        <td data-title='E-mail'>
                                            <audio src={user.audio} controls="controls" />
                                        </td>

                                    </tr>
                                ))}
                                <tfoot>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"---"}
                                        pageCount={25}
                                        marginPagesDisplayed={2}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={"pagination justify-content-center"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                    />
                                </tfoot>
                            </tbody>
                        </table>
                    </main>

                </div>
            </>
        )
    }
}

export default Record;
