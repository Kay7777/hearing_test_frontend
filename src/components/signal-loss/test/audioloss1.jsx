import React from "react";
import { CircularProgress, Avatar, Button } from "@material-ui/core";

class TestMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noise: new Audio(process.env.PUBLIC_URL + "/audios/noise.wav"),
            loading: true,
            maskVolume: this.props.volume,
            sourceVolume: this.props.volume,
            questions: [],
            index: 0,
            dbs: [0],
            time: 0,
            timer: [],
            correct: [],
            userStart: false,
            alert: false,
            once: false,
            traversals: 0,
            lastCorrectness: null,
            pause: false
        }
    }

    componentDidMount = async () => {
        console.log("Cycle: ", this.props.cycle);
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 9; j++) {
                const audio1 = new Audio(process.env.PUBLIC_URL + "/loss-audios/0" + i.toString() + j.toString() + ".wav");
                audio1.volume = 0;
                try {
                    await audio1.play();
                    audio1.pause();
                } catch (e) { console.log(e, "for", i, j) }
            }
        }
        const audio = this.state.noise;
        audio.volume = 0;
        await audio.play();
        audio.pause();
        this.setState({ loading: false }, () => console.log(this.state));
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
        const color = Math.floor(Math.random() * 4).toString();
        const number = Math.ceil(Math.random() * 8).toString();
        const question = "0" + color + number
        questions.push(question);
        this.setState({ questions });
        let sourceAudio = new Audio(process.env.PUBLIC_URL + "/loss-audios/" + question + ".wav");
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
        const { questions, index, timer, lastCorrectness, traversals, correct } = this.state;
        await this.setState({ userStart: false });
        await this.stopTimer();
        console.log(this.state.time);
        await timer.push(this.state.time);
        await this.resetTimer();
        await this.setState({ timer });
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
            console.log("SNR is " + SNR);
            this.props.handleClick(SNR, timer, dbs, correct);
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
                                    <button disabled={!userStart || pause} value="001" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="002" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="003" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="004" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="005" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="006" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="007" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="008" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "red", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="011" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="012" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="013" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="014" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="015" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="016" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="017" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="018" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "green", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="021" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="022" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="023" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="024" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="025" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="026" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="027" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="028" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "blue", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
                                </div>
                                <div className="row" style={{ height: "25%" }}>
                                    <button disabled={!userStart || pause} value="031" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>1</button>
                                    <button disabled={!userStart || pause} value="032" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>2</button>
                                    <button disabled={!userStart || pause} value="033" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>3</button>
                                    <button disabled={!userStart || pause} value="034" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>4</button>
                                    <button disabled={!userStart || pause} value="035" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>5</button>
                                    <button disabled={!userStart || pause} value="036" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>6</button>
                                    <button disabled={!userStart || pause} value="037" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>7</button>
                                    <button disabled={!userStart || pause} value="038" onClick={(e) => this.handleClick(e.target.value)} style={{ color: "white", border: "none", background: "none", width: "12.5%", fontSize: 80 }}>8</button>
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