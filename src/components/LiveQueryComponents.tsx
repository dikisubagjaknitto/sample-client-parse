"use client";

import React, { useEffect, useRef, useState } from 'react'
import Parse from 'parse'

export default function LiveQueryComponents() {
  const [products, setProduct] = useState<any[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    const initParse = async () => {
      Parse.initialize('myAppId', 'injskey')
      Parse.serverURL = 'http://localhost:1400/parse'

      const ObjProduct = Parse.Object.extend('Product')
      const query = new Parse.Query(ObjProduct)
      const initData = await query.findAll()

      setProduct(() => initData.map(val => val.toJSON()))
      const subscribe = async () => {
        new Promise<void>(async (resolve) => {
          const subscriber = await query.subscribe()
          initialized.current = true
          subscriber.on('create', (data) => {
            setProduct((prevData) => [...prevData,  data.toJSON()])
          })

          resolve()
        })
      }

      await subscribe()
    }

    if (initialized.current === false) {
      initParse()
      initialized.current = true
    }

  }, [])

  return (
    <>
      <h2>Data Product</h2>
      <ul>
        {products.map((product) => (
          <li key={product.objectId}>{product.Name} => Stock: {product.Qty}</li>
        ))}
      </ul>
    </>
  )
}