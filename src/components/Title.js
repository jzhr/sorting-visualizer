import React from 'react'
import Typography from '@material-ui/core/Typography';

export class Title extends React.Component {
  render() {
    return <Typography variant='h2'>{this.props.title}</Typography>;
  }
}