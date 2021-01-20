import React from "react";
import { Button, Container, Avatar, LinearProgress } from "@material-ui/core";

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
            userStart: false,
            alert: false,
            once: false,
            traversals: 0,
            lastCorrectness: null,
            stage: "loading",
            process: 0
        }
    }

    componentDidMount = async () => {
        let num = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 9; j++) {
                const audio3 = new Audio(process.env.PUBLIC_URL + "/source-audios/0" + i.toString() + j.toString() + ".wav");
                audio3.volume = 0;
                try {
                    num += 1;
                    await this.setState({ process: num });
                    await audio3.play();
                    audio3.pause();
                } catch (e) { console.log(e, "for", i, j) }
            }
        }
        const audio = this.state.noise;
        audio.volume = 0;
        await audio.play();
        audio.pause();
        this.setState({ loading: false }, () => console.log(this.state));
    }

    startTimer = () => {
        this.setState({ time: new Date().getTime() });
    };
    stopTimer = () => {
        this.setState({ time: new Date().getTime() - this.state.time });
    };
    resetTimer = () => {
        this.setState({ time: 0 });
    };

    componentDidUpdate = () => {
        if (this.state.time >= 5 && this.state.alert === false && this.state.once === false) {
            this.setState({ alert: true, once: true });
        }
    }

    playAudio = async () => {
        const { questions, maskVolume, sourceVolume } = this.state;
        const color = Math.floor(Math.random() * 4).toString();
        const number = Math.ceil(Math.random() * 8).toString();
        const question = "0" + color + number
        questions.push(question);
        this.setState({ questions });
        let sourceAudio = new Audio(process.env.PUBLIC_URL + "/source-audios/" + question + ".wav");
        const maskAudio = this.state.noise;
        sourceAudio.volume = sourceVolume;
        maskAudio.volume = 0.5 * maskVolume;
        await sourceAudio.play();
        await maskAudio.play();
        setTimeout(() => {
            maskAudio.pause();
            this.startTimer();
            this.setState({ userStart: true });
        }, sourceAudio.duration * 1000);
    }

    handleClick = async (num) => {
        const { index, traversals } = this.state;
        await this.stopTimer();
        await console.log(this.state.time);
        await this.resetTimer();
        await this.setState({ userStart: false });
        await this.setState({ index: index + 1, traversals: traversals + 1 });
        if (this.state.traversals >= 3) {
            this.setState({ stage: "done" });
        } else {
            setTimeout(() => {
                this.playAudio();
            }, 2000)
        }
    }

    handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        this.setState({ alert: false });
    };

    render() {
        const { loading, userStart, stage, traversals, process } = this.state;
        return (
            <div>
                {
                    stage === "loading"
                        ?
                        <Container>
                            <div style={{ marginTop: "20%", marginLeft: "10%", marginRight: "10%" }}>
                                <h4>
                                    The following is an example of what you will experience during the experiment.
                                    Listen for the call sign or name Baron. For example, “Ready Baron, go to red three.” Use your mouse and choose the red number 3 on
                                    the computer screen. Please give this example a few minutes to load. A NEXT button will
                                    appear when the trial is ready to start.
                                </h4>
                                <br />
                                {
                                    loading ?
                                        <LinearProgress variant="determinate" value={Math.ceil(process / 32 * 100)} /> :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ margin: 20, width: 150, backgroundColor: "black" }}
                                            onClick={() => {
                                                this.setState({ stage: "test" });
                                                this.playAudio();
                                            }}
                                        >
                                            Next
                                </Button>
                                }
                            </div>


                        </Container>
                        :
                        stage === "done" ?
                            <Container>
                                <div style={{ marginTop: "20%", marginLeft: "10%", marginRight: "10%" }}>
                                    <h4>You are now ready to start the experiment. Your call sign will always be Baron. Follow the instructions as quickly and accurately as possible. If you aren’t sure, make a guess! Press NEXT when you are ready to start.</h4><br />
                                    <h4>You will complete four blocks in this experiment. Each block takes approximately six minutes. The pause button is available between audio presentations and will pause the experiment. Click on it again to resume the experiment.</h4>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ margin: 20, width: 150, backgroundColor: "black" }}
                                        onClick={this.props.handleClick}
                                    >
                                        Next
                                </Button>
                                </div>

                            </Container>
                            :
                            <div>
                                <div style={{ backgroundColor: "#C2CAD0", position: "fixed", height: "90%", width: "100%" }}>
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
                                <div id="progress" className="row" style={{ position: "fixed", left: "20%", bottom: 10 }}>
                                    <h5>Progress⠀</h5>
                                    <Avatar style={{ width: 20, height: 20, backgroundColor: traversals >= 0 ? "blue" : "black" }}>⠀</Avatar>
                                    <Avatar style={{ width: 20, height: 20, backgroundColor: traversals >= 1 ? "blue" : "black" }}>⠀</Avatar>
                                    <Avatar style={{ width: 20, height: 20, backgroundColor: traversals >= 2 ? "blue" : "black" }}>⠀</Avatar>
                                </div>
                            </div>
                }
            </div>
        )
    }
}

export default TestMain;