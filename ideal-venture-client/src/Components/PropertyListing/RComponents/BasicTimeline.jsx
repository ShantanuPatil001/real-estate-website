import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { makeStyles, Paper, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  timeline: {
    transform: "rotate(-90deg)",
  },
  timelineContentContainer: {
    textAlign: "left",
  },
  timelineContent: {
    display: "inline-block",
    transform: "rotate(90deg)",
    textAlign: "center",
  },
  timelineIcon: {
    transform: "rotate(-90deg)",
  },
  timelineConnector: {
    height: "100px",
  },
});
export default function BasicTimeline() {
  const classes = useStyles();

  return (
    <div style={{ position: "absolute", width: "75vw"}}>
      <Timeline className={classes.timeline} align="left">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector className={classes.timelineConnector} />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper elevation={0} className={classes.timelineContent}>
              <Typography>Completed</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector className={classes.timelineConnector} />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper elevation={0} className={classes.timelineContent}>
              <Typography>On Going</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper elevation={0} className={classes.timelineContent}>
              <Typography>Upcoming</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
