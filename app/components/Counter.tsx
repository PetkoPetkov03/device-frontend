import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button';

const Counter = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(count+1);
    }
  return (
    <Card className="w-full max-w-sm text-center">
        <CardHeader>
            <h2 className='text-xl font-semibold'>Interactive Counter</h2>
        </CardHeader>
        <CardContent>
            <p className='text-muted-foreground mb-4'>
                Click button to increase the count:
            </p>
            <Button size="lg" onClick={() => increment()}>Count: {count}</Button>
        </CardContent>
    </Card>
  )
}

export default Counter