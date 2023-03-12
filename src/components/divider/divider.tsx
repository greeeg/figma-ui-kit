import React from 'react'

import { Props } from '../../types/types'
import styles from './divider.module.css'

export function Divider(props: Props<HTMLHRElement>): JSX.Element {
  return <hr {...props} className={styles.divider} />
}
