import { TEAM_MEMBERS } from '../store/campaigns'

export default function AssigneeDropdown({ value, onChange }) {
  return (
    <select
      value={value || ''}
      onChange={e => onChange(e.target.value || null)}
      className="text-xs px-2 py-1 rounded-lg border cursor-pointer transition-colors duration-200 appearance-none"
      style={{
        background: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <option value="">Unassigned</option>
      {TEAM_MEMBERS.map(m => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  )
}
