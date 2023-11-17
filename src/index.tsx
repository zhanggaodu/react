import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './root'
// TODO import Root from '@/root' 为什么用@就会报错
import './root.css'
// TODO tailwindcss 不生效

const dom = document.getElementById('root') as HTMLElement
const root = createRoot(dom)
root.render(<Root />)