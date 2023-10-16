import styles from '@/styles/blogEditor.module.scss'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'

interface Props {
  blogContent: string
  setblogContent: Dispatch<SetStateAction<string>>
}

export default function BlogEditor({ blogContent, setblogContent }: Props) {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const hasInitialContentLoaded = useRef(false)

  useEffect(() => {
    setEditorState(EditorState.createEmpty())
  }, [])

  useEffect(() => {
    if (blogContent && !hasInitialContentLoaded.current) {
      const raw = EditorState.createWithContent(convertFromRaw(markdownToDraft(blogContent)))
      setEditorState(raw)
      hasInitialContentLoaded.current = true
    }
  }, [blogContent])

  const onEditorStateChange = (state: SetStateAction<EditorState>) => {
    setEditorState(state)
    const raw = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    setblogContent(raw)
  }

  return (
    <div className={styles.blogEditor}>
      <Editor
        // className='border'
        editorState={editorState}
        wrapperClassName='blog-wrapper'
        editorClassName='blog-editor'
        toolbarClassName='blog-toolbar'
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'image', 'history'],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            inDropdown: false,
            options: ['unordered', 'ordered'],
          },
        }}
      />
    </div>
  )
}
