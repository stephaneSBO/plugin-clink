<?php

/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */

/* * ***************************Includes********************************* */
require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';

class clink extends eqLogic {
	/*     * *************************Attributs****************************** */

	/*     * ***********************Methode static*************************** */

	/*     * *********************Methode d'instance************************* */

	public function postSave() {
		$close = $this->getCmd(null, 'close');
		if (!is_object($close)) {
			$close = new clinkCmd();
			$close->setLogicalId('close');
			$close->setIsVisible(1);
			$close->setName(__('Fermer', __FILE__));
		}
		$close->setType('action');
		$close->setSubType('other');
		$close->setEqLogic_id($this->getId());
		$close->save();
	}

	/*     * **********************Getteur Setteur*************************** */
}

class clinkCmd extends cmd {
	/*     * *************************Attributs****************************** */

	/*     * ***********************Methode static*************************** */

	/*     * *********************Methode d'instance************************* */

	public function execute($_options = array()) {
		$array = utils::o2a($this);
		if (isset($_options['utid'])) {
			$array['utid'] = $_options['utid'];
		}
		if ($this->getLogicalId() == 'close') {
			nodejs::pushUpdate('clink::close', $array);
		} else {
			nodejs::pushUpdate('clink::open', $array);
		}}

	/*     * **********************Getteur Setteur*************************** */
}

?>
