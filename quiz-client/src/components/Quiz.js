import React, { useEffect, useState } from 'react'
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from '../api';
import {Card, CardContent, List, ListItemButton, Typography, CardHeader, Box, LinearProgress, CardMedia} from "@mui/material";
import { formatTime } from '../helpers';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {

  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const {context, setContext} = useStateContext();
  let timer;

  const navigate = useNavigate();

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1);
    }, 1000);
  }

  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions]
    temp.push({
      qnId,
      selected: optionIdx
    })

    if (qnIndex < 4){
      setContext({selectedOptions: [...temp]})
      setQnIndex(qnIndex+1)
    }else {
      setContext({
        selectedOptions: [...temp],
        timeTaken: timeTaken
      })

      // navigate to Results component
      navigate("/result")

    }
  }

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })

    createAPIEndpoint(ENDPOINTS.question)
    .fetch()
    .then(res => {
      setQns(res.data);
      startTimer();
    })
    .catch(err => {console.log(err);
    });

    return () => {
      clearInterval(timer);
    }
  }, []);

return (
  qns.length != 0
  ? <Card sx={{maxWidth: 640, mx:'auto', mt:5,
    '& .MuiCardHeader-action' : {m:0, alignSelf: 'center'}
  }}>
      <CardHeader 
      title= {'Quesion ' + (qnIndex + 1) + 'of 5'} 
      action={<Typography>{formatTime(timeTaken)}</Typography>} />
      <Box>
        <LinearProgress variant="determinate" value={(qnIndex+1)*100 / 5} />
      </Box>

      {qns[qnIndex].imageName != null
      ? <CardMedia 
        component="img" 
        image={BASE_URL + 'images/' + qns[qnIndex].imageName} 
        sx={{width: 'auto', m:'10px auto'}}
      />
      : null}

      <CardContent>
        <Typography variant='h6'>
          {qns[qnIndex].qnInWords}
        </Typography>
        <List>
          {qns[qnIndex].options.map((item, indx) => 
            <ListItemButton 
            key={indx} disableRipple 
            onClick={() => updateAnswer(qns[qnIndex].qnId, indx)}
            >
              <div>
                <Typography variant='body1' fontWeight='bold' sx={{display: 'inline'}}>
                  {String.fromCharCode(65 + indx) + '. '}
                </Typography> 
                {item}
              </div>
            </ListItemButton>
          )}
        </List>
      </CardContent>
  </Card>
  : null
)
}
