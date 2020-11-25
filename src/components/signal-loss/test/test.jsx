import React from "react";
import { Button, Container } from "@material-ui/core";

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
            stage: "loading"
        }
    }

    componentDidMount = async () => {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 9; j++) {
                const audio3 = new Audio(process.env.PUBLIC_URL + "/source-audios/0" + i.toString() + j.toString() + ".wav");
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
        const { loading, userStart, stage } = this.state;
        return (
            <div>
                {
                    stage === "loading"
                        ?
                        <Container style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
                            <h4>
                                The following is an example of what you will experience during the experiment. Listen for the call sign or name Baron. For example, Baron goes to red 3. Use your mouse and choose the white number 5 on the computer screen. Do this as quickly and accurately as possible.
                            </h4><br />
                            {
                                loading ?
                                    null :
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
                        </Container>
                        :
                        stage === "done" ?
                            <Container style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
                                <h4>You are now ready to start the experiment. Your call sign will always be Baron. Follow the instructions as quickly and accurately as possible. If you aren’t sure, make a guess! Press NEXT when you are ready to start.</h4><br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: 20, width: 150, backgroundColor: "black" }}
                                    onClick={this.props.handleClick}
                                >
                                    Next
                                </Button>
                            </Container>
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
            </div>
        )
    }
}

export default TestMain;