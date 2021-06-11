import React, { Component } from "react";
import { TextField } from "material-ui";
import { SelectField } from "material-ui";
import { MenuItem } from "material-ui";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      amount: 15,
      apiUrl: "https://pixabay.com/api",
      apiKey: "22032123-15db5ac8b33c2f63b3f238650",
      images: [],
      orientation: "",
      color: ""
    };
  }

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState(
      {
        [e.target.name]: val,
      },
      () => {
        if (val === "") {
          this.setState({ images: [] });
        } else {
          axios
            .get(
              `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=${this.state.imgType}&per_page=${this.state.amount}&safesearch=true`
            )
            .then((res) => this.setState({ images: res.data.hits }))
            .catch((err) => console.log(err));
            
              localStorage.setItem('data', JSON.stringify(this.state))
            
        }
      }
    );
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.amount)
    // console.log(this.state.amount)
    
    if(this.state.searchText !=="") {
      // alert("Please Enter text to search images")
      if (prevState.amount !== this.state.amount || prevState.imgType !== this.state.imgType || prevState.orientation !== this.state.orientation || prevState.color !== this.state.color) {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=${this.state.imgType}&per_page=${this.state.amount}&orientation=${this.state.orientation}&colors=${this.state.color}&safesearch=true`
          )
          .then((res) => this.setState({ images: res.data.hits }))
          .catch((err) => console.log(err));
          localStorage.setItem('data', JSON.stringify(this.state))
      }
    }
    
  }
  onAmountChange = (e, index, value) => {
    this.setState({
      amount: value,
    });
  };
  onOrientationChange = (e, index, value) => {
    this.setState({
      orientation: value,
    });
  };
  onColorChange = (e, index, value) => {
    this.setState({
      color: value,
    });
  };
  // handleImgType = (e) => {
  //   this.setState({
  //     imgType: e.target.value
  //   });
  // };

  render() {
    // console.log(this.state);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        <SelectField
          name="orientation"
          floatingLabelText="Orientation"
          value={this.state.orientation}
          onChange={this.onOrientationChange}
        >
          <MenuItem value={"all"} primaryText="All" />
          <MenuItem value={"horizontal"} primaryText="Landscape" />
          <MenuItem value={"vertical"} primaryText="Portrait" />
        </SelectField>
        <br />
        <SelectField
          name="colors"
          floatingLabelText="Color Specific"
          value={this.state.color}
          onChange={this.onColorChange}
        >
          <MenuItem value={"grayscale"} primaryText="Grayscale" />
          <MenuItem value={"transparent"} primaryText="Transparent" />
          <MenuItem value={"red"} primaryText="Red" />
          <MenuItem value={"orange"} primaryText="Orange" />
          <MenuItem value={"yellow"} primaryText="Yellow" />
          <MenuItem value={"green"} primaryText="Green" />
          <MenuItem value={"blue"} primaryText="Blue" />
          <MenuItem value={"pink"} primaryText="Pink" />
          <MenuItem value={"white"} primaryText="White" />
          <MenuItem value={"gray"} primaryText="Gray" />
          <MenuItem value={"black"} primaryText="Black" />
          <MenuItem value={"brown"} primaryText="Brown" />
          <MenuItem value={"turquoise"} primaryText="Turquoise" />
        </SelectField>
        <br />
        
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) :
        this.state.searchText !== "" ? 
        <div> 
        <h1>Sorry! We didn't found any result</h1>
        <h3>Please Try Again</h3>
        </div>
        :
        null
        }
      </div>
    );
  }
}

export default Search;
