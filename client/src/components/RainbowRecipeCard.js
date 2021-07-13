import React from 'react'
import { Card, ButtonIcon, Button } from 'react-rainbow-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faTasks,
//   faShareAlt,
//   faAngleDown
// } from '@fortawesome/free-solid-svg-icons'
// import { faHeart } from '@fortawesome/free-regular-svg-icons'

// const iconContainerStyles = {
//   width: '2.5rem',
//   height: '2.5rem'
// }

const RainbowRecipeCard = (props) => {
  console.log(props)

  return ( 
    <div className="rainbow-m-around_large">
      <Card
        icon={
          <span
            className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center"
            // style={iconContainerStyles}
          >
            {/* <FontAwesomeIcon
              icon={faTasks}
              size="lg"
              className="rainbow-color_white"
            /> */}
          </span>
        }
        title={props.recipe.recipe_poster.username}
        actions={<Button variant="neutral" label="Add" />}
        // footer={
        //   // <div className="rainbow-align-content_space-between">
        //   //   <div className="rainbow-flex">
        //   //     <ButtonIcon
        //   //       icon={<FontAwesomeIcon icon={faHeart} />}
        //   //       className="rainbow-m-right_xx-small"
        //   //     />
        //   //     <ButtonIcon icon={<FontAwesomeIcon icon={faShareAlt} />} />
        //   //   </div>
        //   //   <ButtonIcon icon={<FontAwesomeIcon icon={faAngleDown} />} />
        //   // </div>
        // }
      >
      <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
         <img
          src={`${props.recipe.recipe.photo}`}
          alt="picture of dessert"
          // width="200"
        />
          <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
          {props.recipe.recipe.title}{' '}
          </h1>
        </div>

       <button
          onClick={() => {
            props.fetchRecipeDetails(props.recipe.recipe.id)
          }}
        >
          View Recipe Details
        </button>

        
      </Card>
    </div>


  )
}

export default RainbowRecipeCard

