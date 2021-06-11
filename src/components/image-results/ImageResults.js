import React, { Component } from "react";
import PropTypes from "prop-types";
// import { GridList, GridTile } from "material-ui";

// import { IconButton } from "material-ui";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import { Dialog } from "material-ui";
import { FlatButton } from "material-ui";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1920,
    height: 1080,
  }
});

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: "",
  };
  handleOpen = (img) => {
    this.setState({ open: true, currentImg: img });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props
    let imageListContent;
    const { images } = this.props;
    if (images) {
      imageListContent = (
        <>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                <ListSubheader component="div">Pixels Results:</ListSubheader>
              </GridListTile>
              {images.map((img) => (
                <GridListTile key={img.id}>
                  <img src={img.largeImageURL} alt={"photo"} />
                  <GridListTileBar
                    title={img.tags}
                    subtitle={<span>by: <strong>{img.user}</strong></span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${img.tags}`}
                      >
                        <ZoomIn
                        color="white"
                        onClick={() => this.handleOpen(img.largeImageURL)}
                      />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>

          {/* <GridList cols={3}>
            {images.map((img) => {
              return (
                <GridTile
                  title={img.tags}
                  key={img.id}
                  subtitle={
                    <span>
                      by <strong>{img.user}</strong>
                    </span>
                  }
                  actionIcon={
                    <IconButton>
                      <ZoomIn
                        color="white"
                        onClick={() => this.handleOpen(img.largeImageURL)}
                      />
                    </IconButton>
                  }
                >
                  <img src={img.largeImageURL} alt="image" />
                </GridTile>
              );
            })}
          </GridList> */}
        </>
      );
    } else {
      imageListContent = <h1>Type to search for Image</h1>;
    }
    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />,
    ];
    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="img" style={{ width: "100%" }} />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
};

export default withStyles(styles)(ImageResults);
