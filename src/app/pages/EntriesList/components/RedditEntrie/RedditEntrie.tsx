import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface RedditEntrieInterface {    
    title: string,
    author: string,
    date: string,
    thumbnail?: string,
    comments: number,
    unread: boolean,
    thumbnail_height?: number,
    thumbnail_width?: number,
    id: string
}

const useStyles = makeStyles(() => ({
    root: {
      width: 'calc( 50% - 32px )',
      overflow: 'unset',
      margin: 16,
      position: 'relative',
      paddingBottom: 15
    },            
    media: {
        flex: 1,
        backgroundSize: 'initial',
        backgroundPosition: 'center',
        margin: 'auto'
    },
    actions:{
        position: 'absolute',
        bottom: 5
    }
}));
  

export const RedditEntrie = (props: RedditEntrieInterface) => {
    const classes = useStyles();    
    return(
        <Card className={classes.root}>
            <CardActionArea>
                { props.thumbnail &&
                <CardMedia
                className={classes.media}
                image={props.thumbnail}
                title="Contemplative Reptile"
                style={{height: props.thumbnail_height, width: props.thumbnail_width}}
                /> }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
        </Card>
    )
}