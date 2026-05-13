import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(__dirname, '../public/assets')

/**
 * Fonction récursive pour trouver toutes les images
 */
function walk(dir: string, callback: (filePath: string) => void): void {
  if (!fs.existsSync(dir)) return

  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    if (isDirectory) {
      walk(dirPath, callback)
    } else {
      callback(path.join(dir, f))
    }
  })
}

console.log("🚀 Démarrage de l'optimisation des images (TS)...")

walk(assetsDir, async (filePath: string) => {
  const ext = path.extname(filePath).toLowerCase()

  // On ne traite que les images classiques
  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    const outputTitle = filePath.replace(ext, '.webp')

    // Si la version WebP existe déjà, on supprime juste l'original
    if (fs.existsSync(outputTitle)) {
      fs.unlinkSync(filePath)
      console.log(`🧹 Doublon détecté, original supprimé : ${path.relative(assetsDir, filePath)}`)
      return
    }

    try {
      await sharp(filePath).webp({ quality: 80 }).toFile(outputTitle)

      console.log(`✅ Converti : ${path.relative(assetsDir, outputTitle)}`)

      // Suppression de l'original après succès
      fs.unlinkSync(filePath)
      console.log(`🗑️ Original supprimé : ${path.relative(assetsDir, filePath)}`)
    } catch (err) {
      if (err instanceof Error) {
        console.error(`❌ Erreur sur ${filePath}:`, err.message)
      }
    }
  }
})
