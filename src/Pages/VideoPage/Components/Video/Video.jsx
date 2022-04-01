import "./Video.css";
export const Video = (props) => {
  const classes = props.class
    ? props.class + " video-responsive"
    : "video-responsive";
  const autoplay = props.autoplay ? "&autoplay=1" : "";
  const loop = props.loop
    ? `&playlist=${props.src}&loop=1&showinfo=0&rel=0`
    : "";
  return (
    <div className={classes}>
      <iframe
        title={props.title}
        //This will be uncommented in next PR
        // width={props.width}
        // height={props.height}
        height="100vh"
        width="100%"
        src={`https://www.youtube.com/embed/${props.src}?${loop}${autoplay}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
