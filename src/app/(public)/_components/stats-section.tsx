const stats = [
  { value: "150+", label: "Jamaah" },
  { value: "500+", label: "Transaksi" },
  { value: "50+", label: "Artikel" },
  { value: "10+", label: "Masjid" },
]

function StatsSection() {
  return (
    <section className="border-y bg-muted/50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-primary sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StatsSection }
