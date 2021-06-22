import React, { CSSProperties } from 'react';
import './Art.css';

interface ArtState { }

interface ArtProps {
  Title: string;
  Poetry: string;
  PoetryTitle: string;
  PoetryAuthor: string;
  Picture: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isLoading: boolean;
  error: boolean;
  FrameColor: CSSProperties
}

class PictureContainer extends React.Component<ArtProps, ArtState> {
  render() {

    if (this.props.isLoading) {
      return (
        <div className='Art'>
          <h2 className='ArtTitle'>Title: {this.props.Title}</h2>
          <div className='poetryDiv'>
            <p>Poetry is loading</p>
          </div>
          <div className='ArtFrame' style={this.props.FrameColor}>
            <this.props.Picture></this.props.Picture>
          </div>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div className='Art'>
          <h2 className='ArtTitle'>Title: {this.props.Title}</h2>
          <div className='poetryDiv'>
            <p>Error with fetching poetry. Are you online?</p>
          </div>
          <div className='ArtFrame' style={this.props.FrameColor}>
            <this.props.Picture></this.props.Picture>
          </div>
        </div>
      );
    } else {
      return (
        <div className='Art'>
          <h2 className='ArtTitle'>Title: {this.props.Title}</h2>
          <div className='poetryDiv'>
            <p className='poetry'>
              <i>"{this.props.Poetry}"</i>
            </p>
            <p className='poetryAuthor'>
              - {this.props.PoetryTitle}, {this.props.PoetryAuthor}
            </p>
          </div>
          <div className='ArtFrame' style={this.props.FrameColor}>
            <this.props.Picture></this.props.Picture>
          </div>
        </div>
      );
    }
  }
}

export default PictureContainer;
