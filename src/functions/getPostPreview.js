export default function generateSocialImage({
    title,
    imagePublicID = "alex.party/preview-template.png",
    cloudinaryUrlBase = 'https://res.cloudinary.com',
    version = "v1622614411",
    cloudName = "fimion",
    }){
    const cleanTitle = title.replace(/,/g,'');
    // configure social media image dimensions, quality, and format
  
    // configure the title text
    const titleConfig = `$title_!${encodeURIComponent(cleanTitle)}!`;

    const imageConfig = `t_alex-party-social-card`;
  
    // combine all the pieces required to generate a Cloudinary URL
    const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    titleConfig,
    imageConfig,
    version,
    imagePublicID,
    ];

    // remove any falsy sections of the URL (e.g. an undefined version)
    const validParts = urlParts.filter(Boolean);

    // join all the parts into a valid URL to the generated image
    return validParts.join('/');
}