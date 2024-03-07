import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, isTimerStarted: false}

  startTimer = () => {
    this.setState({isTimerStarted: true})
    this.timer = setInterval(this.tick, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timer)
    this.setState({isTimerStarted: false})
  }

  tick = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      this.pauseTimer()
    } else {
      this.setState(prevState => ({
        minutes:
          prevState.seconds === 0 ? prevState.minutes - 1 : prevState.minutes,
        seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
      }))
    }
  }

  toggleTimer = () => {
    const {isTimerStarted} = this.state // false
    if (isTimerStarted) {
      this.pauseTimer()
    } else {
      this.startTimer()
    }
  }

  resetTimer = () => {
    clearInterval(this.timer)
    this.setState({minutes: 25, seconds: 0, isTimerStarted: false})
  }

  decrementTimer = () => {
    const {isTimerStarted} = this.state
    if (!isTimerStarted) {
      this.setState(prevState => ({
        minutes: prevState.minutes < 1 ? 0 : prevState.minutes - 1,
      }))
    }
  }

  incrementTimer = () => {
    const {isTimerStarted} = this.state
    if (!isTimerStarted) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
      }))
    }
  }

  render() {
    const {minutes, seconds, isTimerStarted} = this.state

    const iconImg = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const timerColor = isTimerStarted ? 'green' : 'white'

    const iconAlt = isTimerStarted ? 'pause icon' : 'play icon'

    return (
      <div className="main">
        <h1 className="heading">Digital Timer</h1>
        <div className="main-1">
          <div className="timer">
            <div className="timer-dial">
              <div style={{paddingTop: '10px'}}>
                <h1 style={{textAlign: 'center'}} className={timerColor}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
                <p style={{textAlign: 'center'}}>
                  {' '}
                  {isTimerStarted ? 'Running' : 'Paused'}{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="timer-control">
            <div style={{display: 'flex', cursor: 'pointer'}}>
              <button
                onClick={this.toggleTimer}
                type="button"
                className="icon-container"
              >
                <img className="icon-img" alt={iconAlt} src={iconImg} />
                <h1
                  style={{
                    color: '#0f172a',
                    fontSize: '24px',
                  }}
                >
                  {isTimerStarted ? 'Pause' : 'Start'}
                </h1>
              </button>
              <button
                onClick={this.resetTimer}
                type="button"
                className="icon-container"
              >
                <img
                  className="icon-img"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <h1
                  style={{
                    color: '#0f172a',
                    fontSize: '24px',
                  }}
                >
                  Reset
                </h1>
              </button>
            </div>
            <p style={{color: '#0f172a', fontWeight: '500', fontSize: '18px'}}>
              Set Timer Limit
            </p>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <button
                onClick={isTimerStarted ? '' : this.decrementTimer}
                type="button"
                style={{fontSize: '50px'}}
              >
                -
              </button>
              <div>
                <p className="set-timer-bg">
                  {' '}
                  {minutes < 10 ? `0${minutes}` : minutes}{' '}
                </p>
              </div>
              <button
                onClick={isTimerStarted ? '' : this.incrementTimer}
                type="button"
                style={{fontSize: '50px'}}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
