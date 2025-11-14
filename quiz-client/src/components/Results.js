import React, { useEffect, useState } from 'react'
import useStateContext from '../hooks/useStateContext';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { Card, Box, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { formatTime } from '../helpers';
import { useNavigate } from 'react-router-dom';

export default function Results() {
  const {context, setContext} = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId);
    createAPIEndpoint(ENDPOINTS.getAnswers)
    .post(ids)
    .then(res => {
      const qna = context.selectedOptions
      .map(x => ({
        ...x,
        ...(res.data.find(y => y.qnId == x.qnId))
      }))

      setQnAnswers(qna);
      calculateScore(qna);
    })
    .catch(error => console.log(error));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc+1 : acc;
    }, 0);

    setScore(tempScore);
  }

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate("/quiz");
  }

  return (
    <>
      <Card sx={{mt:5, display:'flex', maxWidth:640, mx:'auto'}}>
        <Box sx={{display:'flex', flexDirection:'column', flexGrow: 1}}>
          <CardContent sx={{flex: '1 0 auto', textAlign:'center'}}>
            <Typography variant='h4'>Congratulations!</Typography>
            <Typography variant='h6'>YOUR SCORE</Typography>
            <Typography variant='h5' sx={{fontWeight:600}}>
              <Typography variant='span'>
                  {score}
              </Typography>/5
            </Typography>
            <Typography>
              Took {formatTime(context.timeTaken) + ' mins'}
            </Typography>

            <Button variant='contained'
            sx={{mx:1}}
            size='small'>
              Submit
            </Button>
            <Button variant='contained'
            sx={{mx:1}}
            size='small'
            onClick={restart}>
              Re-try
            </Button>
          </CardContent>
        </Box>
        <CardMedia 
        component="img"
        sx={{width:220}}
        image="./result.png" 
        />
      </Card>
    </>
  )
}
