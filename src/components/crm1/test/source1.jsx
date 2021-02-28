import React from "react";
import { CircularProgress, Avatar, Button } from "@material-ui/core";

class TestMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noise: new Audio(process.env.PUBLIC_URL + "/functional-audio/noise.wav"),
            loading: true,
            maskVolume: this.props.volume,
            sourceVolume: this.props.volume,
            questions: [],
            index: 0,
            dbs: [0],
            time: 0,
            timer: [],
            correct: [],
            answers: [],
            userStart: false,
            alert: false,
            once: false,
            traversals: 0,
            lastCorrectness: null,
            pause: false
        }
    }

    componentDidMount = async () => {
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 9; j++) {
                const audio3 = new Audio(process.env.PUBLIC_URL + "/crm1-source-audio/" + i.toString() + j.toString() + ".wav");
                audio3.volume = 0;
                try {
                    await audio3.play();
                    audio3.pause();
                } catch (e) { console.log(e, "for", i, j) }
            }
        }
        const audio = this.state.noise;
        audio.volume = 0;
        await audio.play();
        audio.pause();
        this.setState({ loading: false });
        this.playAudio();
    }

    startTimer = () => {
        this.setState({ time: new Date().getTime() });
    };
    stopTimer = () => {
        this.setState({ time: new Date().getTime() - this.state.time });
    };
    resetTimer = () => {
        this.setState({ time: 0, alert: false });
    };

    playAudio = async () => {
        const { questions, maskVolume, sourceVolume } = this.state;
        const color = Math.ceil(Math.random() * 4).toString();
        const number = Math.ceil(Math.random() * 8).toString();
        const question = color + number
        questions.push(question);
        this.setState({ questions });
        let sourceAudio = new Audio(process.env.PUBLIC_URL + "/crm1-source-audio/" + question + ".wav");
        const maskAudio = this.state.noise;
        sourceAudio.volume = sourceVolume;
        maskAudio.volume = maskVolume;
        await sourceAudio.play();
        await maskAudio.play();
        setTimeout(() => {
            maskAudio.pause();
            this.startTimer();
            this.setState({ userStart: true });
        }, sourceAudio.duration * 1000);
    }

    handleClick = async (num) => {
        const { questions, index, timer, lastCorrectness, traversals, correct, answers } = this.state;
        await this.setState({ userStart: false });
        await this.stopTimer();
        await timer.push(this.state.time);
        await this.resetTimer();
        await this.setState({ timer });
        answers.push(num);
        await this.setState({answers});
        const right = questions[index] === num;
        let sourceVolume;
        if (right) {
            correct.push(true);
            if (lastCorrectness === null) {
                this.setState({ lastCorrectness: true })
            } else if (lastCorrectness === false) {
                console.log("RIGHT, Traversal", traversals + 1, "times!")
                this.setState({ lastCorrectness: true, traversals: traversals + 1 })
            }
            sourceVolume = this.goHarder();
        } else {
            correct.push(false);
            if (lastCorrectness === null) {
                this.setState({ lastCorrectness: false })
            } else if (lastCorrectness === true) {
                console.log("WRONG, Traversal", traversals + 1, "times!")
                this.setState({ lastCorrectness: false, traversals: traversals + 1 })
            }
            sourceVolume = this.goEasier();
        }
        await this.setState({ index: index + 1, sourceVolume, correct });
        if (this.state.traversals >= this.props.reversals) {
            const { dbs } = this.state;
            let sum = 0;
            if (dbs.length >= 10) {
                for (let i = dbs.length - 10; i < dbs.length; i++) {
                    sum += dbs[i];
                }
            } else {
                for (let i = 0; i < dbs.length; i++) {
                    sum += dbs[i];
                }
            }
            const SNR = Number(sum / 10).toFixed(2);
            this.props.handleClick(SNR, timer, dbs, this.state.questions, this.state.answers, correct);
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
        if (sourceVolume * 10 ** (3 / 20) > 1) {
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

    handlePause = () => {
        this.setState({ pause: true });
        if (this.state.userStart) {
            this.stopTimer();
        }
    }

    handleResume = () => {
        this.setState({ pause: false });
        if (this.state.userStart) {
            this.setState({ time: new Date().getTime() - this.state.time });
        }
    }

    render() {
        const { traversals, loading, userStart, pause } = this.state;
        const { reversals } = this.props;
        return (
            <div>
                {
                    loading
                        ?
                        <div>
                            <CircularProgress />
                        </div>
                        :
                        <div>
                            <div id="buttons" style={{ position: "fixed", height: "80%", width: "100%", backgroundColor: "#C2CAD0" }}>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="11" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="12" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="13" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="14" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="15" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="16" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="17" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="18" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="21" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="22" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="23" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="24" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="25" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="26" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="27" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="28" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="31" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="32" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="33" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="34" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="35" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="36" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="37" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="38" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="41" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="42" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="43" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="44" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="45" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="46" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="47" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="48" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                            </div>
                            <div id="progress" className="row" style={{ position: "fixed", left: "5%", right: "5%", bottom: 10 }}>
                                <h5>Progress⠀</h5>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 0 ? traversals >= 0 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 1 ? traversals >= 1 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 2 ? traversals >= 2 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 3 ? traversals >= 3 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 4 ? traversals >= 4 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 5 ? traversals >= 5 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 6 ? traversals >= 6 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 7 ? traversals >= 7 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 8 ? traversals >= 8 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 9 ? traversals >= 9 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 10 ? traversals >= 10 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 11 ? traversals >= 11 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 12 ? traversals >= 12 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 13 ? traversals >= 13 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 14 ? traversals >= 14 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 15 ? traversals >= 15 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 16 ? traversals >= 16 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 17 ? traversals >= 17 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 18 ? traversals >= 18 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 19 ? traversals >= 19 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 20 ? traversals >= 20 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 21 ? traversals >= 21 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 22 ? traversals >= 22 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 23 ? traversals >= 23 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <Avatar style={{ width: 20, height: 20, backgroundColor: reversals > 24 ? traversals >= 24 ? "blue" : "black" : "white" }}>⠀</Avatar>
                                <h5> {this.props.block + 1}/4 Block</h5>
                                {
                                    userStart ?
                                        pause ?
                                            <Button style={{ marginLeft: 10 }} color="secondary" variant="outlined" onClick={this.handleResume}>Resume</Button>
                                            :
                                            <Button style={{ marginLeft: 10 }} color="primary" variant="outlined" onClick={this.handlePause}>Pause</Button>
                                        :
                                        <Button style={{ marginLeft: 10 }} disabled variant="outlined" >Pause</Button>
                                }
                                <p>The blue dots on the progress bar may not advance with each trial. This is normal. Please do not adjust your computer volume during the test.</p>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default TestMain;