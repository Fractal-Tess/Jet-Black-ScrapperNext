export class AsyncTaskRunner<T> {
  queue: Promise<T>[] = []
  size: number

  constructor(queueSize = 5) {
    this.size = queueSize
  }

  public async enqueue(task: () => Promise<T>, handler?: (result?: T) => unknown): Promise<void> {
    // await for a spot in the queue
    if (this.queue.length >= this.size) await Promise.any(this.queue)

    // Run the task and add it to the queue
    const result = task()
    this.queue.push(result)

    // When the task
    result
      .then(data => {
        if (handler) handler(data)
      })
      .catch(error => {
        console.error('Something wrong happened', error)
      })
      .finally(() => {
        this.queue.find((task, idx) => {
          if (task === result) {
            this.queue.splice(idx, 1)
          }
        })
      })
  }
}
