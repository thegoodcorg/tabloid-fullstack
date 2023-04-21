import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { getPostComments } from "../modules/commentManager";



export const PostComments = ({ commentsOnPost }) => {
   
   
    return  <> 
            {commentsOnPost.map(comment => {
            return <li key={comment.id}>
                {comment.content}

            </li>
             })}
            </> 
}

