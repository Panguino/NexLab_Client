'use client'

import { useRootStore } from '@/store/useRootStore'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SoundingPickerPanel.module.scss'

const SoundingPickerPanel = () => {
  const panelIsOpen = useRootStore.use.soundingPickerIsOpen()
  const closePanel = useRootStore.use.closeSoundingPicker()

  return (
    <>
      {panelIsOpen && (
        <div className={styles.soundingPickerPanel}>
          <div className={styles.soundingPickerPanelWrapper}>
            <div className={styles.closeButton} onClick={closePanel}>
              <FontAwesomeIcon icon={faClose} />
            </div>
            <div className={styles.soundingPickerContent}>
              {/* Placeholder: we'll mount a simplified Animator here next step */}
              <div style={{ color: 'white' }}>Sounding Location Picker (coming next)</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SoundingPickerPanel

