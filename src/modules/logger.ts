import express, {Request, Response} from 'express';
import fs from 'fs'

const middleware = (req: Request, res: Response, next: () => void)=>{
    let d = new Date();
    let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();
    let newTime = d.getHours()+ ':'+ d.getMinutes() + ':'+ d.getSeconds();

    if(Object.keys(req.query).length === 0){
        console.log(`Request type: ${req.method}, User parameters: no entries, Date: ${newDate}, Time: ${newTime}`)
    } else {
        console.log(`Request type: ${req.method}, User parameters: ${req.query}, Date: ${newDate}, Time: ${newTime}`)
    }
    
    next();
}

export default middleware;