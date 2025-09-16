import styles from './FeatureData.module.scss'
import { Button, ButtonType } from '@/components/elements/Button/Button'

type Panel = {
  id: string
  title: string
  description?: string
  background?: { url?: string | null; size?: string | null }
  mainButton?: ButtonType | null
  buttonsTitle?: string
  buttons?: ButtonType[]
}

interface FeatureDataProps {
  introText?: string
  panels: Panel[]
}

export const FeatureData = ({ introText, panels }: FeatureDataProps) => {
  return (
    <section className={styles.featureData}>
      <div className={styles.container}>
        {introText && <p className={styles.intro}>{introText}</p>}
        <div className={styles.grid}>
          {panels.map((p) => (
            <div className={styles.card} key={p.id}>
              {p.background?.url && (
                <div className={styles.media} style={{ backgroundImage: `url(${p.background.url})` }} />
              )}
              <div className={styles.body}>
                <h3>{p.title}</h3>
                {p.description && <p className={styles.desc}>{p.description}</p>}
                {p.mainButton && (
                  <div className={styles.mainButton}>
                    <Button {...p.mainButton} />
                  </div>
                )}
                {p.buttons && p.buttons.length > 0 && (
                  <div className={styles.buttonsWrap}>
                    {p.buttonsTitle && <div className={styles.buttonsTitle}>{p.buttonsTitle}</div>}
                    <div className={styles.buttons}>
                      {p.buttons.map((b, i) => (
                        <Button key={i} {...b} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureData

