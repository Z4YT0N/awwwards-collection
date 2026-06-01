
let IMGPATHSOURCE: string = `assets/img/`,
    VIDEOPATHSOURCE: string = `assets/video/`

const ImageSource = ({
    global: {
        logo: require(`../${IMGPATHSOURCE}logotype.png`),
        logoSmall: require(`../${IMGPATHSOURCE}logotype--gray.png`),
        cursor: require(`../${IMGPATHSOURCE}arrow-cursor.png`),
        cursorMenu: require(`../${IMGPATHSOURCE}close-cursor.png`),
    },
    video: {
        case1: require(`../${VIDEOPATHSOURCE}case-1.mp4`),
        case2: require(`../${VIDEOPATHSOURCE}case-2.mp4`),
        case3: require(`../${VIDEOPATHSOURCE}case-3.mp4`),
        case4: require(`../${VIDEOPATHSOURCE}case-4.mp4`),
        case5: require(`../${VIDEOPATHSOURCE}case-5.mp4`),
        case6: require(`../${VIDEOPATHSOURCE}case-6.mp4`)
    },
    arrow: require(`../${IMGPATHSOURCE}arrow-right--black.png`),
    arrowUp: require(`../${IMGPATHSOURCE}arrow-up--black.png`),
    icon_submit: require(`../${IMGPATHSOURCE}arrow-right-bold--white.png`),
    poster: {
        project1: require(`../${IMGPATHSOURCE}poster-project-1.jpg`),
        project2: require(`../${IMGPATHSOURCE}poster-project-2.jpg`),
        project3: require(`../${IMGPATHSOURCE}poster-project-3.jpg`),
        project4: require(`../${IMGPATHSOURCE}poster-project-4.jpg`),
        project5: require(`../${IMGPATHSOURCE}poster-project-5.jpg`),
        project6: require(`../${IMGPATHSOURCE}poster-project-6.jpg`),
    },
    cases: {
        caseProject1: [
            require(`../${IMGPATHSOURCE}cases-project1-image1.jpg`),
            require(`../${IMGPATHSOURCE}cases-project1-image2.jpg`),
            require(`../${IMGPATHSOURCE}cases-project1-image3.jpg`),
            require(`../${IMGPATHSOURCE}cases-project1-image4.jpg`),
            require(`../${IMGPATHSOURCE}cases-project1-image5.jpg`),
            require(`../${IMGPATHSOURCE}cases-project1-image6.jpg`),
            require(`../${IMGPATHSOURCE}cases-project1-image7.jpg`),
        ],
        caseProject2: [
            require(`../${IMGPATHSOURCE}cases-project2-image1.jpg`),
            require(`../${IMGPATHSOURCE}cases-project2-image2.jpg`),
            require(`../${IMGPATHSOURCE}cases-project2-image3.jpg`),
            require(`../${IMGPATHSOURCE}cases-project2-image4.jpg`),
            require(`../${IMGPATHSOURCE}cases-project2-image5.jpg`),
            require(`../${IMGPATHSOURCE}cases-project2-image6.jpg`),
            require(`../${IMGPATHSOURCE}cases-project2-image7.jpg`),
        ],
        caseProject3: [
            require(`../${IMGPATHSOURCE}cases-project3-image1.jpg`),
            require(`../${IMGPATHSOURCE}cases-project3-image2.jpg`),
            require(`../${IMGPATHSOURCE}cases-project3-image3.jpg`),
            require(`../${IMGPATHSOURCE}cases-project3-image4.jpg`),
            require(`../${IMGPATHSOURCE}cases-project3-image5.jpg`),
            require(`../${IMGPATHSOURCE}cases-project3-image6.jpg`),
            require(`../${IMGPATHSOURCE}cases-project3-image7.jpg`),
        ],
        caseProject4: [
            require(`../${IMGPATHSOURCE}cases-project4-image1.jpg`),
            require(`../${IMGPATHSOURCE}cases-project4-image2.jpg`),
            require(`../${IMGPATHSOURCE}cases-project4-image3.jpg`),
            require(`../${IMGPATHSOURCE}cases-project4-image4.jpg`),
        ],
        caseProject5: [
            require(`../${IMGPATHSOURCE}cases-project5-image1.jpg`),
            require(`../${IMGPATHSOURCE}cases-project5-image2.jpg`),
            require(`../${IMGPATHSOURCE}cases-project5-image3.jpg`),
            require(`../${IMGPATHSOURCE}cases-project5-image4.jpg`),
            require(`../${IMGPATHSOURCE}cases-project5-image5.jpg`),
            require(`../${IMGPATHSOURCE}cases-project5-image6.jpg`),
            require(`../${IMGPATHSOURCE}cases-project5-image7.jpg`),
        ],
        caseProject6: [
            require(`../${IMGPATHSOURCE}cases-project6-image1.jpg`),
            require(`../${IMGPATHSOURCE}cases-project6-image2.jpg`),
            require(`../${IMGPATHSOURCE}cases-project6-image3.jpg`),
            require(`../${IMGPATHSOURCE}cases-project6-image4.jpg`),
            require(`../${IMGPATHSOURCE}cases-project6-image5.jpg`),
            require(`../${IMGPATHSOURCE}cases-project6-image6.jpg`),
            require(`../${IMGPATHSOURCE}cases-project6-image7.jpg`),
        ]
    }
})

export default ImageSource