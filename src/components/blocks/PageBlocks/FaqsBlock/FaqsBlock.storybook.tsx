import { Button, ButtonType } from '@/components/elements/Button/Button'
import styles from './FaqsBlock.module.scss'

interface FaqsBlockProps {
  introText?: string
  tags: { name: string; documentId: string }[]
  buttons: ButtonType[]
}

// Storybook-safe stub to avoid server-only imports
export const FaqsBlock = ({ introText, buttons }: FaqsBlockProps) => {
  return (
    <section className={styles.faqsBlock}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left}>
            {introText && (
              <div
                className={styles.intro}
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: introText || '' }}
              />
            )}
            {buttons && buttons.length > 0 && (
              <div className={styles.buttons}>
                {buttons.map((b, i) => (
                  <Button key={i} {...b} />
                ))}
              </div>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.accordionList}>
              {/* Intentionally empty in Storybook to avoid server-side data fetching */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqsBlock

