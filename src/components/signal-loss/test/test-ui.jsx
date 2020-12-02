import React from "react";
import { CircularProgress, Avatar, Button } from "@material-ui/core";

class TestMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noise: new Audio(process.env.PUBLIC_URL + "/audios/noise.wav"),
            loading: true,
            maskVolume: 0.5,
            sourceVolume: 0.5,
            questions: [],
            index: 0,
            dbs: [0],
            time: 0,
            timer: [],
            userStart: false,
            alert: false,
            once: false,
            traversals: 0,
            lastCorrectness: null
        }
    }

    // componentDidMount = async () => {
    //     for (var i = 0; i < 4; i++) {
    //         for (var j = 1; j < 9; j++) {
    //             const audio1 = new Audio(process.env.PUBLIC_URL + "/loss-audios/0" + i.toString() + j.toString() + ".wav");
    //             audio1.volume = 0;
    //             try {
    //                 await audio1.play();
    //                 audio1.pause();
    //             } catch (e) { console.log(e, "for", i, j) }
    //         }
    //     }
    //     const audio = this.state.noise;
    //     audio.volume = 0;
    //     await audio.play();
    //     audio.pause();
    //     this.setState({ loading: false }, () => console.log(this.state));
    //     this.playAudio();
    // }

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
        const { questions, index, timer, lastCorrectness, traversals } = this.state;
        await this.setState({ userStart: false });
        await this.stopTimer();
        console.log(this.state.time);
        await timer.push(this.state.time);
        await this.resetTimer();
        await this.setState({ timer });
        const correct = questions[index] === num;
        let sourceVolume;
        if (correct) {
            if (lastCorrectness === null) {
                this.setState({ lastCorrectness: true })
            } else if (lastCorrectness === false) {
                console.log("RIGHT, Traversal", traversals + 1, "times!")
                this.setState({ lastCorrectness: true, traversals: traversals + 1 })
            }
            sourceVolume = this.goHarder();
        } else {
            if (lastCorrectness === null) {
                this.setState({ lastCorrectness: false })
            } else if (lastCorrectness === true) {
                console.log("WRONG, Traversal", traversals + 1, "times!")
                this.setState({ lastCorrectness: false, traversals: traversals + 1 })
            }
            sourceVolume = this.goEasier();
        }
        await this.setState({ index: index + 1, sourceVolume });
        if (this.state.traversals >= 2) {
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
            this.props.handleClick(SNR, timer, dbs);
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

    render() {
        const { loading, userStart, traversals, pause } = this.state;
        return (
            <div>
                <div>
                    <div id="buttons" style={{ position: "fixed", height: "90%", width: "100%", backgroundColor: "#C2CAD0" }}>
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
                    <br />
                    <div id="progress" className="row" style={{ position: "fixed", left: "20%", bottom: 10 }}>
                        <h5>Progress⠀</h5>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 0 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 1 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 2 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 3 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 4 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 5 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 6 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 7 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 8 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 9 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 10 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 11 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 12 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 13 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 14 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 15 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 16 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 17 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 18 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 19 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 20 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 21 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 22 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 23 ? "blue" : null }}>⠀</Avatar>
                        <Avatar style={{ width: 20, height: 20, backgroundColor: traversals > 24 ? "blue" : null }}>⠀</Avatar>
                        {
                            pause ?
                                <Button onClick={this.handlePause}>Pause</Button>
                                :
                                <Button onClick={this.handlePause}>Resume</Button>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default TestMain;