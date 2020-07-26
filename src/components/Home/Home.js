import React, { Component } from 'react'
import './Home.css';
import Data from '../../assets/Data';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const localizer = momentLocalizer(moment);
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
        // borderRadius: '2% 94% 3% 94% / 88% 6% 88% 6%'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500]
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.root}
            {...other}
        >
            <Typography style={{ color: 'white' }} variant="h6">
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    style={{ color: 'grey' }}
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class Home extends Component {
    constructor() {
        super();
        const now = new Date();
        const events = [
            {
                id: 0,
                title: 'All Day Event very long title',
                allDay: true,
                // var dt = new Date(year, month[, date, hour, minute, second, millisecond]);
                start: new Date(2020, 7, 12, 10, 30, 0, 0),
                end: new Date(2020, 7, 12, 12, 32, 0, 0),
            },
            {
                id: 14,
                title: 'Today',
                start: new Date(new Date().setHours(new Date().getHours() - 3)),
                end: new Date(new Date().setHours(new Date().getHours() + 3)),
            },
            {
                id: 15,
                title: 'Point in Time Event',
                start: now,
                end: now,
            },
        ]
        this.state = {
            name: 'React',
            open: false,
            selectedUser: null,
            id: null,
            activeUser: null,
            activity_periods: null,
            showPopup: false,
            events
        };
    }

    selectHandler = (value) => {
        if (value !== 'Select Users') {
            this.setState({ id: value }, () => {
                let user = Data.members.filter((val) => val.id === this.state.id);
                this.setState({ activeUser: user[0].real_name, events: user[0].activity_periods }, () => {
                    console.log('events', this.state.events);
                    console.log('date', new Date(new Date().setHours(new Date().getHours() - 3)))
                })
                this.popupToggle();
            });
        }
    }

    selectActivityHandler = (value) => {

        let user = Data.members.filter((val) => val.id === this.state.id);
        console.log('user', user)
        this.setState({ selectedUser: user });

    }

    popupToggle = () => {
        this.setState((preState) => {
            return { showPopup: !preState.showPopup }
        });
    }

    render() {

        let showActivity = (
            <Dialog open={this.state.showPopup} fullScreen={true} maxWidth={true} onClose={this.popupToggle}>
                <DialogTitle onClose={this.popupToggle} >
                    {'hello'}
                </DialogTitle>
                <DialogContent>
                    <div style={{ height: '500pt' }}>
                        <Calendar
                            events={this.state.events}
                            startAccessor="start_time"
                            endAccessor="end_time"
                            defaultDate={moment().toDate()}
                            localizer={localizer}
                        />
                    </div>
                </DialogContent>
            </Dialog >
        );

        return (
            <div className="style-top">
                <h1>Users List</h1>
                {Data.members ? Data.members.map((val) => {
                    return (
                        <div key={val.id} className="user-List"
                            onClick={() => this.selectHandler(val.id)} >
                            {val.real_name}
                        </div>
                    )
                }) : null}

                {showActivity}
            </div>
        )
    }
}

export default Home;