import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onFilterLinkClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onFilterLinkClick() // 设置过滤状态
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onFilterLinkClick: PropTypes.func.isRequired
}

export default Link