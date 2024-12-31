import moment from "moment";

function Moment(date) {
    return moment(date).format("DD MMM YYYY");
}
export default Moment;



// Function to calculate the time ago
export const timeAgo = (createdAt) => {
  const now = moment();  // Current time
  const then = moment(createdAt);  // Notification creation time

  const duration = moment.duration(now.diff(then)); // Difference in time

  if (duration.asMinutes() < 1) {
    return `${Math.floor(duration.asSeconds())} seconds ago`; // Less than a minute
  } else if (duration.asHours() < 1) {
    return `${Math.floor(duration.asMinutes())} minutes ago`; // Less than an hour
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())} hours ago`; // Less than a day
  } else {
    return `${Math.floor(duration.asDays())} days ago`; // More than a day
  }
};

