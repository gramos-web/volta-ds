---
pattern: resource-list
version: "1.0.0"
status: stable
figma_page: "DS / Pattern 04 — Resource List"
ai_priority: critical
components_used: [input, button, badge-tag, card, notification]
---

# Resource List — Volta DS

**Regla:** Toda pantalla de lista tiene exactamente estas 5 zonas en este orden.

## Las 5 zonas

### ① Header de página
```
[Título h2]              [Button primary "Nuevo [recurso]"]
[N recursos — muted]
```

### ② Toolbar
```
[Search 300px]  [Filtro ▾]  [Filtro ▾]  [Filtro ▾]  [Vista ⊞≡]
```
Search **siempre presente** — incluso con 0 resultados.

### ③ Table header
```
[☐]  [Col 1]  [Col 2]  [Estado]  [Fecha]
```
bg: color.surface.tertiary, height: 40px, typography.label muted.

### ④ Rows
```
[☐]  [nombre Medium]  [meta]  [Badge sm]  [fecha]  [acciones hover]
```
- Height: 44–48px
- Odd rows: surface.secondary / Even: white
- Seleccionada: bg brand.50
- **Acciones solo en hover** — Editar + Eliminar (ghost sm)

### ⑤ Bulk action bar
```
[bg neutral.900]  "N ítems seleccionados"  [Archivar]  [Eliminar — danger]
```
Aparece solo con selección activa. Fijo en bottom.

## Estados

| Estado | UI |
|--------|-----|
| `loading` | Skeleton de filas — nunca spinner centrado |
| `populated` | Lista normal |
| `empty` | empty-state.md — first-use |
| `search-empty` | empty-state.md — search |
| `filtered-empty` | empty-state.md — filtered |
| `error` | empty-state.md — error |

## Paginación vs scroll infinito

| Paginación | Scroll infinito |
|-----------|----------------|
| Recursos de gestión | Feeds de actividad |
| Usuario busca ítem específico | Contenido lineal |
| URLs paginadas (shareable) | Posición no importa |

## Reglas

| Regla | |
|-------|--|
| Search siempre | Visible aunque haya 0 resultados |
| Acciones en hover | Reduce ruido visual |
| Bulk bar condicional | Solo con selección activa |
| Columnas fijas | No cambiar orden entre vistas |
| Skeleton en loading | Nunca spinner para listas |

## Código

```tsx
function ResourceList() {
  const { data, isLoading, error } = useResources({ search, filters });
  const [selected, setSelected] = useState([]);

  if (isLoading) return <TableSkeleton rows={10} />;
  if (error) return <EmptyState variant="error" onRetry={refetch} />;
  if (!data.length && !search) return <EmptyState variant="first-use" onAction={handleCreate} />;
  if (!data.length) return <EmptyState variant={search ? "search" : "filtered"} />;

  return (
    <>
      <PageHeader title="Proyectos" count={data.total}>
        <Button variant="primary" onClick={handleCreate}>Nuevo proyecto</Button>
      </PageHeader>
      <Toolbar>
        <Input type="search" placeholder="Buscar proyectos…" value={search} onChange={setSearch} />
        <FilterDropdown label="Estado" options={statusOptions} onChange={setStatusFilter} />
      </Toolbar>
      <Table>
        <Table.Header onSelectAll={handleSelectAll} />
        <Table.Body>
          {data.items.map(item => (
            <Table.Row
              key={item.id}
              selected={selected.includes(item.id)}
              onSelect={() => toggleSelect(item.id)}
              actions={<>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>Eliminar</Button>
              </>}
            >
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>
                <Badge type={item.statusType} label={item.statusLabel} size="sm" hasDot />
              </Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {selected.length > 0 && (
        <BulkActionBar count={selected.length}>
          <Button variant="secondary" onClick={handleBulkArchive}>Archivar</Button>
          <Button variant="danger" onClick={handleBulkDelete}>Eliminar</Button>
        </BulkActionBar>
      )}
    </>
  );
}
```
