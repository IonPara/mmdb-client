{
  /* <div className="d-flex images-container">
          <FontAwesomeIcon
            className="arrow-left"
            onClick={() => scroll(-1020)}
            icon={faChevronLeft}
          />
          <div className="image-collection" ref={ref}>
            {images?.map((image: ImageType) => {
              return (
                <div className="p-2" key={image.file_path}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <FontAwesomeIcon
            className="arrow-right"
            onClick={() => scroll(+1020)}
            icon={faChevronRight}
          />
        </div> */
}

const ref = useRef(null);
const scroll = (scrollOffSet: number) => {
  if (ref.current) {
    (ref.current as any).scrollLeft += scrollOffSet;
  }
};
