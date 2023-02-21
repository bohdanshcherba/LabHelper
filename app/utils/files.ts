import PdfThumbnail from "react-native-pdf-thumbnail"


export const getPdfPreview = async (fileCopyUri) => {
  try {
    const {uri} = await PdfThumbnail.generate(fileCopyUri, 0)
    return uri
  }catch (e) {
    console.log(e)
    return ''
  }

}
