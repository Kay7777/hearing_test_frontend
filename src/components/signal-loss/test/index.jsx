import React from "react";
import { CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TestMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noise: new Audio(process.env.PUBLIC_URL + "/audios/noise.wav"),
            loading: true,
            maskVolume: this.props.volume,
            sourceVolume: this.props.volume,
            questions: [],
            lossOrSource: [],
            index: 0,
            dbs: [0],
            amount: 5,
            time: 0,
            timer: [],
            userStart: false,
            alert: false,
            once: false
        }
    }

    componentDidMount = async () => {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 9; j++) {
                console.log(process.env.PUBLIC_URL + "/loss-audios/0" + i.toString() + j.toString() + ".wav");
                const audio1 = new Audio(process.env.PUBLIC_URL + "/loss-audios/0" + i.toString() + j.toString() + ".wav");
                // const audio2 = new Audio(process.env.PUBLIC_URL + "/mask-audios/0" + i.toString() + j.toString() + ".wav");
                const audio3 = new Audio(process.env.PUBLIC_URL + "/source-audios/0" + i.toString() + j.toString() + ".wav");
                audio1.volume = 0;
                // audio2.volume = 0;
                audio3.volume = 0;
                try {
                    await audio1.play();
                    // await audio2.play();
                    await audio3.play();
                    audio1.pause();
                    // audio2.pause();
                    audio3.pause();
                } catch (e) { console.log(e, "for", i, j) }
            }
        }
        const audio = this.state.noise;
        audio.volume = 0;
        await audio.play();
        audio.pause();
        const questions = [];
        const lossOrSource = [];
        for (let i = 0; i < this.state.amount; i++) {
            const color = Math.floor(Math.random() * 4).toString();
            const number = Math.ceil(Math.random() * 8).toString();
            lossOrSource.push(Math.floor(Math.random() * 2).toString());
            questions.push("0" + color + number);
        }
        this.setState({ lossOrSource, loading: false, questions }, () => console.log(this.state));
        this.playAudio();
    }

    componentDidUpdate = () => {
        // console.log(this.state)
        if (this.state.time >= 5 && this.state.alert === false && this.state.once === false) {
            this.setState({ alert: true, once: true });
        }
    }

    startTimer = () => {
        this.timer = setInterval(
            () => {
                this.setState({
                    time: this.state.time + 0.01,
                })
            },
            10
        );
        console.log("start");
    };
    stopTimer = () => {
        clearInterval(this.timer);
        console.log("stop");
    };
    resetTimer = () => {
        this.setState({ time: 0, alert: false, once: false });
        console.log("reset");
    };

    playAudio = async () => {
        const { questions, index, maskVolume, sourceVolume, lossOrSource } = this.state;
        let sourceAudio;
        if (lossOrSource[index] === "0") {
            sourceAudio = new Audio(process.env.PUBLIC_URL + "/loss-audios/" + questions[index] + ".wav");
        } else {
            sourceAudio = new Audio(process.env.PUBLIC_URL + "/source-audios/" + questions[index] + ".wav");
        }
        const maskAudio = this.state.noise;
        sourceAudio.volume = sourceVolume;
        maskAudio.volume = maskVolume;
        await sourceAudio.play();
        await maskAudio.play();
        console.log("this audio is", sourceAudio.duration, "s long.");
        setTimeout(() => {
            maskAudio.pause();
            this.setState({ userStart: true });
            this.startTimer();
        }, sourceAudio.duration * 1000);
    }

    handleClick = async (num) => {
        const { questions, index, timer } = this.state;
        this.setState({ userStart: false });
        this.stopTimer();
        timer.push(Number(this.state.time).toFixed(3));
        this.resetTimer();
        this.setState({ timer });
        const correct = questions[index] === num;
        if (correct) {
            var sourceVolume = this.goHarder();
        } else {
            var sourceVolume = this.goEasier();
        }
        console.log(this.state);
        await this.setState({ index: index + 1, sourceVolume });
        if (this.state.index >= this.state.amount) {
            console.log("it goes finish")
            const { dbs, lossOrSource } = this.state;
            const sum = dbs.reduce((pre, num) => pre + num, 0);
            const SNR = Number(sum / 5).toFixed(2);
            console.log("SNR is " + SNR);
            this.props.handleClick(SNR, timer, lossOrSource, dbs);
        } else {
            setTimeout(() => {
                this.playAudio();
            }, 2000)
        }
    }

    goEasier = () => {
        const { sourceVolume, index, dbs } = this.state;
        dbs.push(dbs[index] + 3);
        this.setState({ dbs });
        if (sourceVolume * 10 ** (2 / 20) > 1) {
            return 1;
        } else {
            return sourceVolume * 10 ** (3 / 20);
        }
    };

    goHarder = () => {
        const { sourceVolume, index, dbs } = this.state;
        dbs.push(dbs[index] - 1);
        this.setState({ dbs });
        return sourceVolume * 10 ** (-1 / 20);
    };

    handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        this.setState({ alert: false });
    };

    render() {
        const { loading, index, amount, userStart, time } = this.state;
        return (
            <div>
                {
                    loading
                        ?
                        <div>
                            <CircularProgress />
                            <h2>Loading data ... (this may take half a minute when you first time do the test)</h2>
                        </div>
                        :
                        <div style={{ backgroundColor: "grey", position: "fixed", height: "100%", width: "100%" }}>
                            <div className="row" style={{ height: "25%" }}>
                                <button disabled={!userStart} value="001" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                <button disabled={!userStart} value="002" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                <button disabled={!userStart} value="003" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                <button disabled={!userStart} value="004" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                <button disabled={!userStart} value="005" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                <button disabled={!userStart} value="006" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                <button disabled={!userStart} value="007" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                <button disabled={!userStart} value="008" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                            </div>
                            <div className="row" style={{ height: "25%" }}>
                                <button disabled={!userStart} value="011" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                <button disabled={!userStart} value="012" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                <button disabled={!userStart} value="013" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                <button disabled={!userStart} value="014" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                <button disabled={!userStart} value="015" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                <button disabled={!userStart} value="016" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                <button disabled={!userStart} value="017" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                <button disabled={!userStart} value="018" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                            </div>
                            <div className="row" style={{ height: "25%" }}>
                                <button disabled={!userStart} value="021" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                <button disabled={!userStart} value="022" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                <button disabled={!userStart} value="023" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                <button disabled={!userStart} value="024" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                <button disabled={!userStart} value="025" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                <button disabled={!userStart} value="026" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                <button disabled={!userStart} value="027" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                <button disabled={!userStart} value="028" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                            </div>
                            <div className="row" style={{ height: "25%" }}>
                                <button disabled={!userStart} value="031" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                <button disabled={!userStart} value="032" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                <button disabled={!userStart} value="033" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                <button disabled={!userStart} value="034" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                <button disabled={!userStart} value="035" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                <button disabled={!userStart} value="036" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                <button disabled={!userStart} value="037" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                <button disabled={!userStart} value="038" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                            </div>
                        </div>
                }
                <Snackbar
                    open={this.state.alert}
                    autoHideDuration={3000}
                    onClose={this.handleCloseAlert}
                >
                    <Alert onClose={this.handleClose} severity="info">
                        You can guess one!
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default TestMain;