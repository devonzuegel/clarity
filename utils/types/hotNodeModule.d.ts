declare global {
  interface NodeModule {
    hot: {
      accept(
        dependencies: string[],
        cb: (updatedDependencies: string[]) => void
      ): void
      accept(dependency: string, cb: () => void): void
      accept(errHandler?: (err: any) => void): void
      decline(dependencies: string[]): void
      decline(dependency: string): void
      decline(): void

      dispose(cb: (data: any) => void): void
      addDisposeHandler(cb: (data: any) => void): void

      removeDisposeHandler(cb: (data: any) => void): void
    }
  }
}

export default {}
