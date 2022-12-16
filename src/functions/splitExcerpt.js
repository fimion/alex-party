import sanitizeHtml from 'sanitize-html';
const splitExcerpt = (content, nuclear)=>{
  if(content.includes(`<!-- break -->`)){
    return content.split(`<!-- break -->`)[0];
  }
  const match = content.match(/^\<p\>(.*)\<\/p\>/);
  if(nuclear){
    return sanitizeHtml(match?.[0] || content,{allowedAttributes: {}, allowedTags:[]})
  }
  return sanitizeHtml(match?.[0] || content);
}

export default splitExcerpt
