module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable React Hooks warnings in page components
    'react-hooks/rules-of-hooks': 'off',
    
    // Disable unescaped entities for quotes
    'react/no-unescaped-entities': 'off',
    
    // Disable unused vars warnings completely for now
    '@typescript-eslint/no-unused-vars': 'off',
    
    // Disable any type warnings
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Disable wrapper object types
    '@typescript-eslint/no-wrapper-object-types': 'off',
    
    // Disable prefer-as-const
    '@typescript-eslint/prefer-as-const': 'off'
  }
}; 