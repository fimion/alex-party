export default function generateSocialImage({
    title,
    imagePublicID = "alex.party/preview-template.png",
    cloudinaryUrlBase = 'https://res.cloudinary.com',
    version = "v1622614411",
    cloudName = "fimion",
    titleFont = 'schoolbell.ttf',
    titleExtraConfig = '',
    imageWidth = 1200,
    imageHeight = 630,
    textAreaWidth = 1050,
    textLeftOffset = 75,
    titleTopOffset = 225,
    textColor = '000000',
    titleFontSize = 72,
    }){
    // configure social media image dimensions, quality, and format
    const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'q_auto',
    'f_auto',
    ].join(',');
  
    // configure the title text
    const titleConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_north_west',
    `x_${textLeftOffset}`,
    `y_${titleTopOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
    title,
    )}`,
    ].join(',');
  
    // combine all the pieces required to generate a Cloudinary URL
    const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    titleConfig,
    version,
    imagePublicID,
    ];

    // remove any falsy sections of the URL (e.g. an undefined version)
    const validParts = urlParts.filter(Boolean);

    // join all the parts into a valid URL to the generated image
    return validParts.join('/');
}